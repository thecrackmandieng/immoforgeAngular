import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FavorisTafType } from '../taf-type/favoris-taf-type';
@Component({
  selector: 'app-add-favoris',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-favoris.component.html',
  styleUrls: ['./add-favoris.component.css']
})
export class AddFavorisComponent implements OnInit, OnDestroy {
  reactiveForm_add_favoris !: FormGroup;
  submitted:boolean=false
  loading_add_favoris :boolean=false
  form_details: any = {}
  loading_get_details_add_favoris_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddFavorisComponent");
      this.get_details_add_favoris_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_favoris  = this.formBuilder.group({
user_id: [""],
bien_id: [""],
date_ajout: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_favoris .controls; }
  // validation du formulaire
  onSubmit_add_favoris () {
      this.submitted = true;
      console.log(this.reactiveForm_add_favoris .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_favoris .invalid) {
          return;
      }
      var favoris =this.reactiveForm_add_favoris .value
      this.add_favoris (favoris )
  }
  // vider le formulaire
  onReset_add_favoris () {
      this.submitted = false;
      this.reactiveForm_add_favoris .reset();
  }
  add_favoris(favoris: any) {
      this.loading_add_favoris = true;
      this.api.taf_post("favoris/add", favoris, (reponse: any) => {
      this.loading_add_favoris = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table favoris. Réponse= ", reponse);
          this.onReset_add_favoris()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table favoris a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_favoris = false;
    })
  }

  get_details_add_favoris_form() {
      this.loading_get_details_add_favoris_form = true;
      this.api.taf_post("favoris/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table favoris. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table favoris a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_favoris_form = false;
      }, (error: any) => {
      this.loading_get_details_add_favoris_form = false;
    })
  }
}
