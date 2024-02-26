import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface Message {
  message : string;
}
interface Test {
  id : number;
  text : string;
}
class DataDto {
  text: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('message')
  getHello(): Message {
    const hello = this.appService.getHello(); 
    const msg : Message = {message : hello};
    return msg;
  }

  @Get('test')
  async getTest() {
    const test : Test[] = await this.appService.getTest();
    return test;
  }

  @Post('test')
  async addTest(@Body() dataDto : DataDto) {
    try {
      await this.appService.addTest(dataDto.text);
      return true;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }
}
