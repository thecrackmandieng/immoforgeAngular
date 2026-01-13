import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddUserDocumentsComponent } from '../add-user-documents/add-user-documents.component';
  import { EditUserDocumentsComponent } from '../edit-user-documents/edit-user-documents.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { UserDocumentsTafType } from '../taf-type/user-documents-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-user-documents',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-user-documents.component.html',
    styleUrls: ['./list-user-documents.component.css']
  })
  export class ListUserDocumentsComponent implements OnInit, OnDestroy{
    loading_get_user_documents = false
    loading_delete_user_documents = false
    les_user_documentss: UserDocumentsTafType[] = []
    list: UserDocumentsTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListUserDocumentsComponent");
      this.get_user_documents()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_user_documents() {
      this.loading_get_user_documents = true;
      this.api.taf_post("user_documents/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_user_documentss = reponse.data
          console.log("Opération effectuée avec succés sur la table user_documents. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table user_documents a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_user_documents = false;
      }, (error: any) => {
        this.loading_get_user_documents = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_user_documentss.filter((one: any) => {
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
    delete_user_documents (user_documents : any){
      this.loading_delete_user_documents = true;
      this.api.taf_post("user_documents/delete", user_documents,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table user_documents . Réponse = ",reponse)
          this.get_user_documents()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table user_documents  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_user_documents = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_user_documents = false;
      })
    }
    openModal_add_user_documents() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddUserDocumentsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_user_documents()
        } else {

        }
      })
    }
    openModal_edit_user_documents(one_user_documents: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditUserDocumentsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.user_documents_to_edit = one_user_documents;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_user_documents()
        } else {

        }
      })
    }
  }