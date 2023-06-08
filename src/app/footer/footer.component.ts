import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ChangeValueService } from '../2.Services/change-value.service';
import { Subscription } from 'rxjs';
declare var jQuery: any; 

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  @Output() openDialog = new EventEmitter<void>();
  isLogged!: boolean;
  subscription!: Subscription;

  constructor(private CVSrv: ChangeValueService) { };

  ngOnInit() {
    this.subscription = this.CVSrv.currentLogged.subscribe((logged) => { if (logged != undefined) this.isLogged = logged });
    this.CVSrv.loggedValue(this.isLogged);
    ( ($) => {
      var $main_nav = $('#main-nav');
      var $toggle = $('.toggle');

      var defaultOptions = {
        disableAt: false,
        customToggle: $toggle,
        levelSpacing: 40,
        navTitle: 'All Categories',
        levelTitles: true,
        levelTitleAsBack: true,
        pushContent: '#container',
        insertClose: 2
      };

      // call our plugin
      var Nav = $main_nav.hcOffcanvasNav(defaultOptions);

      // add new items to original nav
      $main_nav.find('li.add').children('a').on('click',  () => {
        var $this = $(this);
        var $li = $this.parent();
        var items = eval('(' + $this.attr('data-add') + ')');

        $li.before('<li class="new"><a href="#">' + items[0] + '</a></li>');

        items.shift();

        if (!items.length) {
          $li.remove();
        }
        else {
          $this.attr('data-add', JSON.stringify(items));
        }

        Nav.update(true);
      });

      // demo settings update

      const update = (settings: any) => {
        if (Nav.isOpen()) {
          Nav.on('close.once', function () {
            Nav.update(settings);
            Nav.open();
          });

          Nav.close();
        }
        else {
          Nav.update(settings);
        }
      };

      $('.actions').find('a').on('click', (e: any) => {
        e.preventDefault();

        var $this = $(this).addClass('active');
        var $siblings = $this.parent().siblings().children('a').removeClass('active');
        var settings = eval('(' + $this.data('demo') + ')');

        update(settings);
      });

      $('.actions').find('input').on('change', () => {
        var $this = $(this);
        var settings = eval('(' + $this.data('demo') + ')');

        if ($this.is(':checked')) {
          update(settings);
        }
        else {
          var removeData;
          $.each(settings, (index: any, value: any) => {
            removeData[index] = false;
          });

          update(removeData);
        }
      });
    })(jQuery);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  OpenDialog() {
   this.openDialog.emit(); 
  }

}
