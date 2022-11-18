import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _renderer;

  constructor(private _rendererFactory: RendererFactory2) {
    this._renderer = _rendererFactory.createRenderer(null, null);
  }

  public generateMessage(message: string, messageType: string) {
    const errorMessageContainer = this._renderer.createElement('div');
    const id = 0;
    this._renderer.setAttribute(errorMessageContainer, 'id', id.toString());
    this._renderer.addClass(errorMessageContainer, messageType);
    this._renderer.setProperty(errorMessageContainer, 'innerHTML', message);
    this._renderer.appendChild(document.body, errorMessageContainer);
    setTimeout(() => {
      document.getElementById(id.toString())?.classList.add('show');
    }, 100);
    setTimeout(() => {
      document.getElementById(id.toString())?.classList.remove('show');
    }, 2500);
    setTimeout(() => {
      document.getElementById(id.toString())?.remove();
    }, 2700);
  }
}
