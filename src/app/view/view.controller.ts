import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ViewController {
    @Get()
    @Render('index')
    home(){
      return {};
    }

    @Get("/checkout")
    @Render('checkout')
    checkout(){
      return {};
    }
}
