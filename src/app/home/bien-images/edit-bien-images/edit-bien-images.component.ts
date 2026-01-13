import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BienImagesTafType } from '../taf-type/bien-images-taf-type';
@Component({
  selector: 'app-edit-bien-images',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-bien-images.component.html',
  styleUrls: ['./edit-bien-images.component.css']
})
export class EditBienImagesComponent implements OnInit, OnDestroy {
  reactiveForm_edit_bien_images !: FormGroup;
  submitted: boolean = false
  loading_edit_bien_images: boolean = false
  @Input()
  bien_images_to_edit: BienImagesTafType = new BienImagesTafType();
  form_details: any = {}
  loading_get_details_edit_bien_images_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditBienImagesComponent");
      this.get_details_edit_bien_images_form()
      this.update_form(this.bien_images_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(bien_images_to_edit:any) {
      this.reactiveForm_edit_bien_images = this.formBuilder.group({
          bien_id : [bien_images_to_edit.bien_id],
url_image : [bien_images_to_edit.url_image],
ordre : [bien_images_to_edit.ordre],
date_upload : [bien_images_to_edit.date_upload]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_bien_images .controls; }
  // validation du formulaire
  onSubmit_edit_bien_images() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_bien_images.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_bien_images.invalid) {
          return;
      }
      var bien_images = this.reactiveForm_edit_bien_images.value
      this.edit_bien_images({
      condition:{id_image:this.bien_images_to_edit.id_image},
      data:bien_images
      })
  }
  // vider le formulaire
  onReset_edit_bien_images() {
      this.submitted = false;
      this.reactiveForm_edit_bien_images.reset();
  }
  edit_bien_images(bien_images: any) {
      this.loading_edit_bien_images = true;
      this.api.taf_post("bien_images/edit", bien_images, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table bien_images. Réponse= ", reponse);
              //this.onReset_edit_bien_images()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table bien_images a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_bien_images = false;
      }, (error: any) => {
          this.loading_edit_bien_images = false;
      })
  }
  get_details_edit_bien_images_form() {
      this.loading_get_details_edit_bien_images_form = true;
      this.api.taf_post("bien_images/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_images. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table bien_images a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_bien_images_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_bien_images_form = false;
    })
  }
}