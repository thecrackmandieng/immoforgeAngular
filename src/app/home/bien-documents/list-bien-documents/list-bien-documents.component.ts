import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddBienDocumentsComponent } from '../add-bien-documents/add-bien-documents.component';
  import { EditBienDocumentsComponent } from '../edit-bien-documents/edit-bien-documents.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { BienDocumentsTafType } from '../taf-type/bien-documents-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-bien-documents',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-bien-documents.component.html',
    styleUrls: ['./list-bien-documents.component.css']
  })
  export class ListBienDocumentsComponent implements OnInit, OnDestroy{
    loading_get_bien_documents = false
    loading_delete_bien_documents = false
    les_bien_documentss: BienDocumentsTafType[] = []
    list: BienDocumentsTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListBienDocumentsComponent");
      this.get_bien_documents()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_bien_documents() {
      this.loading_get_bien_documents = true;
      this.api.taf_post("bien_documents/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_bien_documentss = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_documents. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table bien_documents a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_bien_documents = false;
      }, (error: any) => {
        this.loading_get_bien_documents = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_bien_documentss.filter((one: any) => {
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
    delete_bien_documents (bien_documents : any){
      this.loading_delete_bien_documents = true;
      this.api.taf_post("bien_documents/delete", bien_documents,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table bien_documents . Réponse = ",reponse)
          this.get_bien_documents()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table bien_documents  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_bien_documents = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_bien_documents = false;
      })
    }
    openModal_add_bien_documents() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddBienDocumentsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_documents()
        } else {

        }
      })
    }
    openModal_edit_bien_documents(one_bien_documents: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditBienDocumentsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.bien_documents_to_edit = one_bien_documents;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_bien_documents()
        } else {

        }
      })
    }
  }