import { SentenceDto } from './dto/sentence.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class ChatService {
  async requestToChatGpt(sentenceDto: SentenceDto) {
    try {
      const inputText = sentenceDto.sentence.replace(/\r/g, '');
      let option = sentenceDto.option;
      if (option === 'question') {
        option = '';
      } else if (option === 'summarize') {
        option = 'summarize the previous sentence';
      } else if (option === 'translate') {
        option = 'translate the previous sentence into Korean';
      }

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      async function runCompletion(
        message: string,
        option: string,
      ): Promise<string> {
        const tempResponse = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `${message}+ ${option}`,
          temperature: 0,
          max_tokens: 1000,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        return tempResponse.data.choices[0].text;
      }

      return runCompletion(inputText, option);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error in ChatGPT API');
    }
  }
}
