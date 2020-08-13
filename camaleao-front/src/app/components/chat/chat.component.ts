import { Component, OnInit } from '@angular/core';
import { UpdateChatService } from 'src/app/core/services/chat.service';
import { Message, ChatHistory } from 'src/app/core/data/chat';
import { scheduleJob, cancelJob, Job } from 'node-schedule';
import $ from "jquery";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public isOpen = false;
  public counter = 10;
  public textMessage = '';
  public message: Message = {}
  public messages = [];
  public flForm = false;

  public chatSchedule: Job

  constructor(
    private chatService: UpdateChatService
  ) {}

  ngOnInit() {
    this.chatService.chatHistory.subscribe(chatHistory => this.messageChatHistory(chatHistory));
  }

  messageChatHistory(chatHistory: ChatHistory){
    if(this.messages.length == 0){
      this.setMessage();
    }else{
      chatHistory.models.sort((a, b) => Number(a.id) - Number(b.id));
      this.messages.push(...chatHistory.models)
      this.updateScroll()

      //console.log("##", this.messages[this.messages.length - 1].id)

      cancelJob(this.chatSchedule)
      this.scheduleJobChat()
    }
  }

  scheduleJobChat(){
    this.chatSchedule = scheduleJob('*/5 * * * * *', function(chat, idLast){
      //console.log("@@", idLast)
      chat.chatService.getChatReceive(chat.chatService.getChatAuthentication().atendimento_sessao_id, 10, false, idLast)
    }.bind(null, this, this.messages[this.messages.length - 1].id));
  }

  setMessage(){
    if(this.messages.length == 0){
      this.flForm = true;
      this.messages.push(this.generateMessage("Digite o seu nome:", "message other"))
    }
  }

  updateScroll(){
    setTimeout(function(){
      var div = $("#messageid");
      var h = div.get(0).scrollHeight;
      div.animate({scrollTop: h}, 800);
    }, 100);
  }

  sendMessage(){
    if(this.flForm){
      this.chatAuthentication();
    }else{
      this.chatService.setChatReceive(this.textMessage, this.messages[0].id);
    }
    this.updateScroll()
    this.textMessage = '';
  }

  chatAuthentication(){
    if(this.messages.length == 3){      
      this.messages.push(this.generateMessage(this.textMessage, "message me"))

      this.chatService.chatAuthentication(this.messages[1].text,  this.messages[3].text).then(ret => {
        this.flForm = false
      });
    }

    if(this.messages.length == 1){
      this.messages.push(this.generateMessage(this.textMessage, "message me"))
    }

    if(this.messages.length == 2){
      this.messages.push(this.generateMessage("Digite o seu email:", "message other"))
    }
  }

  generateMessage(textMessage: string, person: string){
    let message: Message = {}
    message.text = textMessage.trim()
    message.created_at = new Date().getTime()
    message.person = person
    return message;
  }

  formatCreatedAt(dateTime: number){
    let created_at = new Date(dateTime)
    return created_at.toLocaleDateString('pt-BR') + ' ' + created_at.toLocaleTimeString('pt-BR')
  }
}
