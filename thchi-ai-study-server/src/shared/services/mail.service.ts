import * as Brevo from '@getbrevo/brevo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private brevo: Brevo.BrevoClient;

  constructor(private readonly configService: ConfigService) {
    this.brevo = new Brevo.BrevoClient({
      apiKey: () => this.configService.get<string>('BREVO_API_KEY')!,
      maxRetries: 5,
    });
  }

  async sendOTPCodeToEmail(email: string, otp: string) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #202124; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="margin-bottom: 16px;">Hi my friend, ThChi here!</p>
        
        <p style="margin-bottom: 16px;">Thanks for helping us keep your account secure!</p>
        
        <p style="margin-bottom: 16px;">This is your ThChi secret verification code:</p>
        
        <p style="color: #1a73e8; font-size: 32px; font-weight: bold; margin: 24px 0;">${otp}</p>
        
        <p style="margin-bottom: 16px;">This code will expire in 10 minutes.</p>
        
        <p style="margin-bottom: 24px;">Feel free to reach out to our support team if you encounter any issues or have questions.</p>
        
        <p style="margin-bottom: 4px;">--</p>
        <p style="margin-bottom: 16px;">Best regards,<br><strong>ThChi</strong></p>
        
        <ul style="padding-left: 20px; font-size: 14px; color: #5f6368; line-height: 1.8;">
          <li>Contact us: <a href="m.me/ThChiGlobal" style="color: #1a73e8; text-decoration: none;">m.me/ThChiGlobal</a></li>
          <li><a href="#" style="color: #1a73e8; text-decoration: none;">ThChi FAQ</a></li>
          <li>Try our spaced repetition flashcards: <a href="#" style="color: #1a73e8; text-decoration: none;">ThChi Web App</a></li>
        </ul>
      </div>
    `;

    const sendSmtpEmail = await this.brevo.transactionalEmails.sendTransacEmail(
      {
        subject: '[ThChi] Verify Your Email Address',
        htmlContent: htmlContent,
        sender: {
          name: 'ThChi',
          email: this.configService.get<string>('BREVO_EMAIL_FROM')!,
        },
        to: [{ email }],
      },
    );
    return sendSmtpEmail;
  }
}
