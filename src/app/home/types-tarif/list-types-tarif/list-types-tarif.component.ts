import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddTypesTarifComponent } from '../add-types-tarif/add-types-tarif.component';
  import { EditTypesTarifComponent } from '../edit-types-tarif/edit-types-tarif.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { TypesTarifTafType } from '../taf-type/types-tarif-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-types-tarif',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-types-tarif.component.html',
    styleUrls: ['./list-types-tarif.component.css']
  })
  export class ListTypesTarifComponent implements OnInit, OnDestroy{
    loading_get_types_tarif = false
    loading_delete_types_tarif = false
    les_types_tarifs: TypesTarifTafType[] = []
    list: TypesTarifTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListTypesTarifComponent");
      this.get_types_tarif()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_types_tarif() {
      this.loading_get_types_tarif = true;
      this.api.taf_post("types_tarif/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_types_tarifs = reponse.data
          console.log("Opération effectuée avec succés sur la table types_tarif. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table types_tarif a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_types_tarif = false;
      }, (error: any) => {
        this.loading_get_types_tarif = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_types_tarifs.filter((one: any) => {
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
    delete_types_tarif (types_tarif : any){
      this.loading_delete_types_tarif = true;
      this.api.taf_post("types_tarif/delete", types_tarif,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table types_tarif . Réponse = ",reponse)
          this.get_types_tarif()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table types_tarif  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_types_tarif = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_types_tarif = false;
      })
    }
    openModal_add_types_tarif() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddTypesTarifComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_types_tarif()
        } else {

        }
      })
    }
    openModal_edit_types_tarif(one_types_tarif: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditTypesTarifComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.types_tarif_to_edit = one_types_tarif;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_types_tarif()
        } else {

        }
      })
    }
  }