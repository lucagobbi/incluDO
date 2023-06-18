import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(private translateService: TranslateService) { }
  getTranslation(msg: string): string {
    let msgTranslated = '';
    this.translateService.get(msg).subscribe(translation => {
      msgTranslated = translation;
    });
    return msgTranslated;
  }
}
