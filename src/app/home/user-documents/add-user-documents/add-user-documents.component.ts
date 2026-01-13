import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserDocumentsTafType } from '../taf-type/user-documents-taf-type';
@Component({
  selector: 'app-add-user-documents',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-user-documents.component.html',
  styleUrls: ['./add-user-documents.component.css']
})
export class AddUserDocumentsComponent implements OnInit, OnDestroy {
  reactiveForm_add_user_documents !: FormGroup;
  submitted:boolean=false
  loading_add_user_documents :boolean=false
  form_details: any = {}
  loading_get_details_add_user_documents_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddUserDocumentsComponent");
      this.get_details_add_user_documents_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_user_documents  = this.formBuilder.group({
          user_id: [""],
document_type: [""],
url_document: [""],
statut: [""],
remarque_admin: [""],
date_upload: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_user_documents .controls; }
  // validation du formulaire
  onSubmit_add_user_documents () {
      this.submitted = true;
      console.log(this.reactiveForm_add_user_documents .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_user_documents .invalid) {
          return;
      }
      var user_documents =this.reactiveForm_add_user_documents .value
      this.add_user_documents (user_documents )
  }
  // vider le formulaire
  onReset_add_user_documents () {
      this.submitted = false;
      this.reactiveForm_add_user_documents .reset();
  }
  add_user_documents(user_documents: any) {
      this.loading_add_user_documents = true;
      this.api.taf_post("user_documents/add", user_documents, (reponse: any) => {
      this.loading_add_user_documents = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table user_documents. Réponse= ", reponse);
          this.onReset_add_user_documents()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table user_documents a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_user_documents = false;
    })
  }
  
  get_details_add_user_documents_form() {
      this.loading_get_details_add_user_documents_form = true;
      this.api.taf_post("user_documents/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table user_documents. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table user_documents a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_user_documents_form = false;
      }, (error: any) => {
      this.loading_get_details_add_user_documents_form = false;
    })
  }
}
