import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddDemandesComponent } from '../add-demandes/add-demandes.component';
  import { EditDemandesComponent } from '../edit-demandes/edit-demandes.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { DemandesTafType } from '../taf-type/demandes-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-demandes',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-demandes.component.html',
    styleUrls: ['./list-demandes.component.css']
  })
  export class ListDemandesComponent implements OnInit, OnDestroy{
    loading_get_demandes = false
    loading_delete_demandes = false
    les_demandess: DemandesTafType[] = []
    list: DemandesTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListDemandesComponent");
      this.get_demandes()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_demandes() {
      this.loading_get_demandes = true;
      this.api.taf_post("demandes/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_demandess = reponse.data
          console.log("Opération effectuée avec succés sur la table demandes. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table demandes a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_demandes = false;
      }, (error: any) => {
        this.loading_get_demandes = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_demandess.filter((one: any) => {
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
    delete_demandes (demandes : any){
      this.loading_delete_demandes = true;
      this.api.taf_post("demandes/delete", demandes,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table demandes . Réponse = ",reponse)
          this.get_demandes()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table demandes  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_demandes = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_demandes = false;
      })
    }
    openModal_add_demandes() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddDemandesComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_demandes()
        } else {

        }
      })
    }
    openModal_edit_demandes(one_demandes: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditDemandesComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.demandes_to_edit = one_demandes;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_demandes()
        } else {

        }
      })
    }
  }