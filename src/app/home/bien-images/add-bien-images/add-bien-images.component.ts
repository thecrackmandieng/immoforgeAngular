import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BienImagesTafType } from '../taf-type/bien-images-taf-type';
@Component({
  selector: 'app-add-bien-images',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-bien-images.component.html',
  styleUrls: ['./add-bien-images.component.css']
})
export class AddBienImagesComponent implements OnInit, OnDestroy {
  reactiveForm_add_bien_images !: FormGroup;
  submitted:boolean=false
  loading_add_bien_images :boolean=false
  form_details: any = {}
  loading_get_details_add_bien_images_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddBienImagesComponent");
      this.get_details_add_bien_images_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_bien_images  = this.formBuilder.group({
          bien_id: [""],
url_image: [""],
ordre: [""],
date_upload: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_bien_images .controls; }
  // validation du formulaire
  onSubmit_add_bien_images () {
      this.submitted = true;
      console.log(this.reactiveForm_add_bien_images .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_bien_images .invalid) {
          return;
      }
      var bien_images =this.reactiveForm_add_bien_images .value
      this.add_bien_images (bien_images )
  }
  // vider le formulaire
  onReset_add_bien_images () {
      this.submitted = false;
      this.reactiveForm_add_bien_images .reset();
  }
  add_bien_images(bien_images: any) {
      this.loading_add_bien_images = true;
      this.api.taf_post("bien_images/add", bien_images, (reponse: any) => {
      this.loading_add_bien_images = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table bien_images. Réponse= ", reponse);
          this.onReset_add_bien_images()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table bien_images a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_bien_images = false;
    })
  }
  
  get_details_add_bien_images_form() {
      this.loading_get_details_add_bien_images_form = true;
      this.api.taf_post("bien_images/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_images. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table bien_images a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_bien_images_form = false;
      }, (error: any) => {
      this.loading_get_details_add_bien_images_form = false;
    })
  }
}
