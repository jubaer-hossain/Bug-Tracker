import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @Input() showMobileMenu: boolean;

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activateMenu();
      }
    });
  }

  ngOnInit() {
    this.showMobileMenu = false;
  }

  ngAfterViewInit() {
    this.activateMenu();
  }

  /**
   * On menu click
   */
  onMenuClick(event: any) {
    const nextEl = event.target.nextSibling;
    if (nextEl && !nextEl.classList.contains('open')) {
      const parentEl = event.target.parentNode;
      if (parentEl) { parentEl.classList.remove('open'); }

      nextEl.classList.add('open');
    } else if (nextEl) { nextEl.classList.remove('open'); }
    return false;
  }

  /**
   * Dark Menubar
   */
  darkTopbar() {
    document.body.classList.add('topbar-dark');
    document.body.classList.remove('topbar-light');
    document.body.classList.remove('unsticky-header');
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('drop-menu-dark');
    document.body.classList.remove('menubar-light');
    document.body.classList.remove('center-menu');
  }

  /**
   * Light Topbar
   */
  lightMenubar() {
    document.body.classList.add('menubar-light');
    document.body.classList.add('topbar-dark');
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('center-menu');
    document.body.classList.remove('gradient-topbar');
    document.body.classList.remove('unsticky-header');
  }

  /**
   * Show menu in center
   */
  centerMenu() {
    document.body.classList.add('center-menu');
    document.body.classList.remove('topbar-dark');
    document.body.classList.remove('menubar-light');
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('gradient-topbar');

  }

  gradientTopbar() {
    document.body.classList.add('gradient-topbar');
    document.body.classList.add('topbar-dark');
    document.body.classList.remove('drop-menu-dark');
    document.body.classList.remove('unsticky-header');
    document.body.classList.remove('center-menu');

  }

  dropmenuDark() {
    document.body.classList.add('drop-menu-dark');
    document.body.classList.remove('gradient-topbar');
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('center-menu');
    document.body.classList.remove('menubar-light');

  }
  /**
   * Unsticky Header
   */
  unstickyHeader() {
    document.body.classList.add('unsticky-header');
    document.body.classList.remove('boxed-layout');
    document.body.classList.remove('center-menu');
    document.body.classList.remove('drop-menu-dark');
    document.body.classList.remove('topbar-dark');
    document.body.classList.remove('menubar-light');
  }

  /**
   * Boxed Layout
   */
  boxedLayout() {
    document.body.classList.add('boxed-layout');
    document.body.classList.remove('drop-menu-dark');
    document.body.classList.remove('gradient-topbar');
    document.body.classList.remove('topbar-dark');
    document.body.classList.remove('menubar-light');
  }

  /**
   * Activates the menu
   */
  private activateMenu() {

    const resetParents = (el: any) => {
      const parent = el.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.remove('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove('in');
        }
        const parent3 = parent2.parentElement;
        if (parent3) {
          parent3.classList.remove('active');
          const childAnchor = parent3.querySelector('.has-dropdown');
          if (childAnchor) { childAnchor.classList.remove('active'); }
        }

        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.remove('in');
        }
        const parent5 = parent4.parentElement;
        if (parent5) {
          parent5.classList.remove('active');
        }
      }
    }

    // activate menu item based on location
    const links = document.getElementsByClassName('side-nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset the parents
      resetParents(links[i]);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (location.pathname === links[i]['pathname']) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('in');
        }
        const parent3 = parent2.parentElement;
        if (parent3) {
          parent3.classList.add('active');
          const childAnchor = parent3.querySelector('.has-dropdown');
          if (childAnchor) { childAnchor.classList.add('active'); }
        }

        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add('in');
        }
        const parent5 = parent4.parentElement;
        if (parent5) {
          parent5.classList.add('active');
        }
      }
    }
  }
}
