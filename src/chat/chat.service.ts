import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private readonly httpService: HttpService) {}

  async sendMessage(message: string, history: any[]) {
    try {
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:8000/api/chat', {
          message,
          history,
        }),
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao comunicar com a IA');
    }
  }
}