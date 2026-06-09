import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  activeTab:
    | 'personal'
    | 'addresses'
    | 'payment'
    | 'insurance'
    | 'security'
    | 'notifications'
    | 'language' = 'personal';

  setActiveTab(
    tab:
      | 'personal'
      | 'addresses'
      | 'payment'
      | 'insurance'
      | 'security'
      | 'notifications'
      | 'language',
  ): void {
    this.activeTab = tab;
  }
}
