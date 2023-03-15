import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  sentence: string;
  translation: string;
  summary: string;

  constructor(private http: HttpClient) {}

  translate() {
    this.http
      .post('/translate', { sentence: this.sentence })
      .subscribe((response: any) => {
        this.translation = response.translation;
      });
  }

  summarize() {
    this.http
      .post('/summarize', { sentence: this.sentence })
      .subscribe((response: any) => {
        this.summary = response.summary;
      });
  }
}
