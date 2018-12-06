import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ROUTES, RouteInfo } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Candidat } from '../../models/candidat';
import { NotificationComponent } from '../../notification/notification.component';
import { LoginService } from 'app/services/login.service';

export const ROUTE: RouteInfo[] = [
    { path: 'utilisateurs', title: 'Ajouter utilisateur',  icon: 'ti-settings', class: ''}
  ]
@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    listCandidtatVerifDatEmb:Candidat[];
    public menuItems: any[];
    public linkProfil = "profil";


    @ViewChild("navbar-cmp") button;

    constructor(location:Location, private renderer : Renderer, 
        private element : ElementRef,
        private notificationService:NotificationService,
        public auth:LoginService) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

    }

    ngOnInit(){
        this.menuItems = ROUTE.filter(menuItem => menuItem);
        this.listTitles = ROUTE.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.getVerifierDateEmbouche();
    }
    
    getTitle(){
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Gestion des Candidats';
    }
    getVerifierDateEmbouche(){
        this.notificationService.getVerifierDateEmbouche()
             .subscribe( 
                 res => {
                 this.listCandidtatVerifDatEmb = res;
             }
             )
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
}
