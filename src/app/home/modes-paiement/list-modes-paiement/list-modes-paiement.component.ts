import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddModesPaiementComponent } from '../add-modes-paiement/add-modes-paiement.component';
  import { EditModesPaiementComponent } from '../edit-modes-paiement/edit-modes-paiement.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { ModesPaiementTafType } from '../taf-type/modes-paiement-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-modes-paiement',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-modes-paiement.component.html',
    styleUrls: ['./list-modes-paiement.component.css']
  })
  export class ListModesPaiementComponent implements OnInit, OnDestroy{
    loading_get_modes_paiement = false
    loading_delete_modes_paiement = false
    les_modes_paiements: ModesPaiementTafType[] = []
    list: ModesPaiementTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListModesPaiementComponent");
      this.get_modes_paiement()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_modes_paiement() {
      this.loading_get_modes_paiement = true;
      this.api.taf_post("modes_paiement/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_modes_paiements = reponse.data
          console.log("Opération effectuée avec succés sur la table modes_paiement. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table modes_paiement a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_modes_paiement = false;
      }, (error: any) => {
        this.loading_get_modes_paiement = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_modes_paiements.filter((one: any) => {
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
    delete_modes_paiement (modes_paiement : any){
      this.loading_delete_modes_paiement = true;
      this.api.taf_post("modes_paiement/delete", modes_paiement,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table modes_paiement . Réponse = ",reponse)
          this.get_modes_paiement()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table modes_paiement  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_modes_paiement = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_modes_paiement = false;
      })
    }
    openModal_add_modes_paiement() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddModesPaiementComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_modes_paiement()
        } else {

        }
      })
    }
    openModal_edit_modes_paiement(one_modes_paiement: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditModesPaiementComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.modes_paiement_to_edit = one_modes_paiement;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_modes_paiement()
        } else {

        }
      })
    }
  }