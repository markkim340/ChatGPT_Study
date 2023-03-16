import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  private apiUrl = 'http://127.0.0.1:3000/api';
  requestSentence: string;
  responseFromChatGpt: string;
  isLoading = false;

  constructor(private http: HttpClient) {}

  requestToChatGpt(option: string) {
    try {
      if (!this.requestSentence) {
        alert('Please enter a sentence');
        throw new Error('Not Found Sentence Error');
      }
      this.isLoading = true;
      this.http
        .post(
          `${this.apiUrl}/chatgpt`,
          { sentence: this.requestSentence, option: option },
          { responseType: 'text' }
        )
        .subscribe((response: string) => {
          this.responseFromChatGpt = response;
          this.isLoading = false;
        });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }
}
