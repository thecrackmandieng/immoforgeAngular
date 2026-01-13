import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddClientsComponent } from '../add-clients/add-clients.component';
  import { EditClientsComponent } from '../edit-clients/edit-clients.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { ClientsTafType } from '../taf-type/clients-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-clients',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-clients.component.html',
    styleUrls: ['./list-clients.component.css']
  })
  export class ListClientsComponent implements OnInit, OnDestroy{
    loading_get_clients = false
    loading_delete_clients = false
    les_clientss: ClientsTafType[] = []
    list: ClientsTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListClientsComponent");
      this.get_clients()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_clients() {
      this.loading_get_clients = true;
      this.api.taf_post("clients/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_clientss = reponse.data
          console.log("Opération effectuée avec succés sur la table clients. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table clients a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_clients = false;
      }, (error: any) => {
        this.loading_get_clients = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_clientss.filter((one: any) => {
        let search = !event?.term || JSON.stringify(one).toLowerCase().replace(/s/g, '')
          .includes(event?.term?.toLowerCase().replace(/s/g, ''))
        // filtre complexe
        // let filtre_objet: any = {}
        // let text = !this.filter.text || this.filter.text.length == 0
        //   || this.filter.text.filter((one_filtre: string) => {
        //     let domaine = !one_filtre.startsWith('domaine_') || (one_filtre.startsWith('domaine_') && one_filtre.replace('domaine_', '') == one.id_domaine)
        //     let zone = !one_filtre.startsWith('zone_') || (one_filtre.startsWith('zone_') && one_filtre.replace('zone_', '') == one.id_zone)

        //     // Incrémenter les compteurs
        //     if (one_filtre.startsWith('domaine_')) filtre_objet.domaine_ = (filtre_objet.domaine_ || 0) + 1
        //     if (one_filtre.startsWith('zone_')) filtre_objet.zone_ = (filtre_objet.zone_ || 0) + 1
        //     return domaine && zone
        //   }).length >= Object.keys(filtre_objet).length

        return search// && text
      })
    }
    delete_clients (clients : any){
      this.loading_delete_clients = true;
      this.api.taf_post("clients/delete", clients,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table clients . Réponse = ",reponse)
          this.get_clients()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table clients  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_clients = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_clients = false;
      })
    }
    openModal_add_clients() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddClientsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_clients()
        } else {

        }
      })
    }
    openModal_edit_clients(one_clients: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditClientsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.clients_to_edit = one_clients;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_clients()
        } else {

        }
      })
    }
  }