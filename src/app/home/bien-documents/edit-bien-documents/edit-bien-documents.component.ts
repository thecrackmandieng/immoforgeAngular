import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BienDocumentsTafType } from '../taf-type/bien-documents-taf-type';
@Component({
  selector: 'app-edit-bien-documents',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-bien-documents.component.html',
  styleUrls: ['./edit-bien-documents.component.css']
})
export class EditBienDocumentsComponent implements OnInit, OnDestroy {
  reactiveForm_edit_bien_documents !: FormGroup;
  submitted: boolean = false
  loading_edit_bien_documents: boolean = false
  @Input()
  bien_documents_to_edit: BienDocumentsTafType = new BienDocumentsTafType();
  form_details: any = {}
  loading_get_details_edit_bien_documents_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditBienDocumentsComponent");
      this.get_details_edit_bien_documents_form()
      this.update_form(this.bien_documents_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(bien_documents_to_edit:any) {
      this.reactiveForm_edit_bien_documents = this.formBuilder.group({
          bien_id : [bien_documents_to_edit.bien_id],
nom_document : [bien_documents_to_edit.nom_document],
url_document : [bien_documents_to_edit.url_document],
date_upload : [bien_documents_to_edit.date_upload]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_bien_documents .controls; }
  // validation du formulaire
  onSubmit_edit_bien_documents() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_bien_documents.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_bien_documents.invalid) {
          return;
      }
      var bien_documents = this.reactiveForm_edit_bien_documents.value
      this.edit_bien_documents({
      condition:{id_doc:this.bien_documents_to_edit.id_doc},
      data:bien_documents
      })
  }
  // vider le formulaire
  onReset_edit_bien_documents() {
      this.submitted = false;
      this.reactiveForm_edit_bien_documents.reset();
  }
  edit_bien_documents(bien_documents: any) {
      this.loading_edit_bien_documents = true;
      this.api.taf_post("bien_documents/edit", bien_documents, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table bien_documents. Réponse= ", reponse);
              //this.onReset_edit_bien_documents()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table bien_documents a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_bien_documents = false;
      }, (error: any) => {
          this.loading_edit_bien_documents = false;
      })
  }
  get_details_edit_bien_documents_form() {
      this.loading_get_details_edit_bien_documents_form = true;
      this.api.taf_post("bien_documents/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_documents. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table bien_documents a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_bien_documents_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_bien_documents_form = false;
    })
  }
}