export interface IMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}
