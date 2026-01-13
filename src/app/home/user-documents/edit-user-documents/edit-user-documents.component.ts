import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserDocumentsTafType } from '../taf-type/user-documents-taf-type';
@Component({
  selector: 'app-edit-user-documents',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-user-documents.component.html',
  styleUrls: ['./edit-user-documents.component.css']
})
export class EditUserDocumentsComponent implements OnInit, OnDestroy {
  reactiveForm_edit_user_documents !: FormGroup;
  submitted: boolean = false
  loading_edit_user_documents: boolean = false
  @Input()
  user_documents_to_edit: UserDocumentsTafType = new UserDocumentsTafType();
  form_details: any = {}
  loading_get_details_edit_user_documents_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditUserDocumentsComponent");
      this.get_details_edit_user_documents_form()
      this.update_form(this.user_documents_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(user_documents_to_edit:any) {
      this.reactiveForm_edit_user_documents = this.formBuilder.group({
          user_id : [user_documents_to_edit.user_id],
document_type : [user_documents_to_edit.document_type],
url_document : [user_documents_to_edit.url_document],
statut : [user_documents_to_edit.statut],
remarque_admin : [user_documents_to_edit.remarque_admin],
date_upload : [user_documents_to_edit.date_upload]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_user_documents .controls; }
  // validation du formulaire
  onSubmit_edit_user_documents() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_user_documents.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_user_documents.invalid) {
          return;
      }
      var user_documents = this.reactiveForm_edit_user_documents.value
      this.edit_user_documents({
      condition:{id_doc:this.user_documents_to_edit.id_doc},
      data:user_documents
      })
  }
  // vider le formulaire
  onReset_edit_user_documents() {
      this.submitted = false;
      this.reactiveForm_edit_user_documents.reset();
  }
  edit_user_documents(user_documents: any) {
      this.loading_edit_user_documents = true;
      this.api.taf_post("user_documents/edit", user_documents, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table user_documents. Réponse= ", reponse);
              //this.onReset_edit_user_documents()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table user_documents a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_user_documents = false;
      }, (error: any) => {
          this.loading_edit_user_documents = false;
      })
  }
  get_details_edit_user_documents_form() {
      this.loading_get_details_edit_user_documents_form = true;
      this.api.taf_post("user_documents/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table user_documents. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table user_documents a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_user_documents_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_user_documents_form = false;
    })
  }
}