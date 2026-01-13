import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddEtatsDemandeComponent } from '../add-etats-demande/add-etats-demande.component';
  import { EditEtatsDemandeComponent } from '../edit-etats-demande/edit-etats-demande.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { EtatsDemandeTafType } from '../taf-type/etats-demande-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-etats-demande',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-etats-demande.component.html',
    styleUrls: ['./list-etats-demande.component.css']
  })
  export class ListEtatsDemandeComponent implements OnInit, OnDestroy{
    loading_get_etats_demande = false
    loading_delete_etats_demande = false
    les_etats_demandes: EtatsDemandeTafType[] = []
    list: EtatsDemandeTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListEtatsDemandeComponent");
      this.get_etats_demande()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_etats_demande() {
      this.loading_get_etats_demande = true;
      this.api.taf_post("etats_demande/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_etats_demandes = reponse.data
          console.log("Opération effectuée avec succés sur la table etats_demande. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table etats_demande a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_etats_demande = false;
      }, (error: any) => {
        this.loading_get_etats_demande = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_etats_demandes.filter((one: any) => {
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
    delete_etats_demande (etats_demande : any){
      this.loading_delete_etats_demande = true;
      this.api.taf_post("etats_demande/delete", etats_demande,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table etats_demande . Réponse = ",reponse)
          this.get_etats_demande()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table etats_demande  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_etats_demande = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_etats_demande = false;
      })
    }
    openModal_add_etats_demande() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddEtatsDemandeComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_etats_demande()
        } else {

        }
      })
    }
    openModal_edit_etats_demande(one_etats_demande: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditEtatsDemandeComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.etats_demande_to_edit = one_etats_demande;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_etats_demande()
        } else {

        }
      })
    }
  }