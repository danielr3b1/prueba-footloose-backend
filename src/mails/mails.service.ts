import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {

  constructor(private mailerService: MailerService) { }

  async sendCredentialsUser(producto: string, oldPrecio: string, newPrecio: string, email: string) {

    await this.mailerService.sendMail({
      to: email,
      subject: "Alerta - cambio de precio",
      template: "./welcome",
      context: {
        producto: producto,
        oldPrecio: oldPrecio,
        newPrecio: newPrecio
      }
    })

  }

}
