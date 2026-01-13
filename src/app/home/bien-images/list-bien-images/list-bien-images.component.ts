import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddBienImagesComponent } from '../add-bien-images/add-bien-images.component';
  import { EditBienImagesComponent } from '../edit-bien-images/edit-bien-images.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { BienImagesTafType } from '../taf-type/bien-images-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-bien-images',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-bien-images.component.html',
    styleUrls: ['./list-bien-images.component.css']
  })
  export class ListBienImagesComponent implements OnInit, OnDestroy{
    loading_get_bien_images = false
    loading_delete_bien_images = false
    les_bien_imagess: BienImagesTafType[] = []
    list: BienImagesTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListBienImagesComponent");
      this.get_bien_images()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_bien_images() {
      this.loading_get_bien_images = true;
      this.api.taf_post("bien_images/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_bien_imagess = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_images. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table bien_images a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_bien_images = false;
      }, (error: any) => {
        this.loading_get_bien_images = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_bien_imagess.filter((one: any) => {
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
    delete_bien_images (bien_images : any){
      this.loading_delete_bien_images = true;
      this.api.taf_post("bien_images/delete", bien_images,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table bien_images . Réponse = ",reponse)
          this.get_bien_images()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table bien_images  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_bien_images = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_bien_images = false;
      })
    }
    openModal_add_bien_images() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddBienImagesComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_images()
        } else {

        }
      })
    }
    openModal_edit_bien_images(one_bien_images: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditBienImagesComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.bien_images_to_edit = one_bien_images;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_images()
        } else {

        }
      })
    }
  }