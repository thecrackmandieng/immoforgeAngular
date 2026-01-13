import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddRegionsComponent } from '../add-regions/add-regions.component';
  import { EditRegionsComponent } from '../edit-regions/edit-regions.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { RegionsTafType } from '../taf-type/regions-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-regions',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-regions.component.html',
    styleUrls: ['./list-regions.component.css']
  })
  export class ListRegionsComponent implements OnInit, OnDestroy{
    loading_get_regions = false
    loading_delete_regions = false
    les_regionss: RegionsTafType[] = []
    list: RegionsTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListRegionsComponent");
      this.get_regions()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_regions() {
      this.loading_get_regions = true;
      this.api.taf_post("regions/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_regionss = reponse.data
          console.log("Opération effectuée avec succés sur la table regions. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table regions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_regions = false;
      }, (error: any) => {
        this.loading_get_regions = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_regionss.filter((one: any) => {
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
    delete_regions (regions : any){
      this.loading_delete_regions = true;
      this.api.taf_post("regions/delete", regions,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table regions . Réponse = ",reponse)
          this.get_regions()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table regions  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_regions = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_regions = false;
      })
    }
    openModal_add_regions() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddRegionsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_regions()
        } else {

        }
      })
    }
    openModal_edit_regions(one_regions: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditRegionsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.regions_to_edit = one_regions;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_regions()
        } else {

        }
      })
    }
  }