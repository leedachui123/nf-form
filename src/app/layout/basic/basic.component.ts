import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultModule, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { SettingDrawerModule } from '@delon/theme/setting-drawer';
import { environment } from '@env/environment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@Component({
  selector: 'layout-basic',
  template: `
    <layout-default [options]="options" [content]="contentTpl" [customError]="null">
      <ng-template #contentTpl>
        <router-outlet />
      </ng-template>
    </layout-default>
  `,
  imports: [RouterOutlet, LayoutDefaultModule, SettingDrawerModule, NzIconModule, NzMenuModule, NzDropdownModule, NzAvatarModule]
})
export class LayoutBasicComponent {
  private readonly settings = inject(SettingsService);
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`,
    hideAside: true
  };
  get user(): User {
    return this.settings.user;
  }
}
