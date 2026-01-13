import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddZonesComponent } from '../add-zones/add-zones.component';
  import { EditZonesComponent } from '../edit-zones/edit-zones.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { ZonesTafType } from '../taf-type/zones-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-zones',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-zones.component.html',
    styleUrls: ['./list-zones.component.css']
  })
  export class ListZonesComponent implements OnInit, OnDestroy{
    loading_get_zones = false
    loading_delete_zones = false
    les_zoness: ZonesTafType[] = []
    list: ZonesTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListZonesComponent");
      this.get_zones()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_zones() {
      this.loading_get_zones = true;
      this.api.taf_post("zones/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_zoness = reponse.data
          console.log("Opération effectuée avec succés sur la table zones. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table zones a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_zones = false;
      }, (error: any) => {
        this.loading_get_zones = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_zoness.filter((one: any) => {
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
    delete_zones (zones : any){
      this.loading_delete_zones = true;
      this.api.taf_post("zones/delete", zones,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table zones . Réponse = ",reponse)
          this.get_zones()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table zones  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_zones = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_zones = false;
      })
    }
    openModal_add_zones() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddZonesComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_zones()
        } else {

        }
      })
    }
    openModal_edit_zones(one_zones: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditZonesComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.zones_to_edit = one_zones;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_zones()
        } else {

        }
      })
    }
  }