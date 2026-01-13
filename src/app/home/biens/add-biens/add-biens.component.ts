import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BiensTafType } from '../taf-type/biens-taf-type';
@Component({
  selector: 'app-add-biens',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-biens.component.html',
  styleUrls: ['./add-biens.component.css']
})
export class AddBiensComponent implements OnInit, OnDestroy {
  reactiveForm_add_biens !: FormGroup;
  submitted:boolean=false
  loading_add_biens :boolean=false
  form_details: any = {}
  loading_get_details_add_biens_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddBiensComponent");
      this.get_details_add_biens_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_biens  = this.formBuilder.group({
          uuid: [""],
proprietaire_user_id: [""],
type_bien_id: [""],
etat_bien_id: [""],
statut_validation_id: [""],
titre: [""],
description: [""],
region_id: [""],
zone_id: [""],
adresse_detaillee: [""],
latitude: [""],
longitude: [""],
superficie: [""],
chambres: [""],
salles_bain: [""],
capacite: [""],
prix: [""],
devise: [""],
date_publication: [""],
date_modification: [""],
raison_refus: [""],
is_archived: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_biens .controls; }
  // validation du formulaire
  onSubmit_add_biens () {
      this.submitted = true;
      console.log(this.reactiveForm_add_biens .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_biens .invalid) {
          return;
      }
      var biens =this.reactiveForm_add_biens .value
      this.add_biens (biens )
  }
  // vider le formulaire
  onReset_add_biens () {
      this.submitted = false;
      this.reactiveForm_add_biens .reset();
  }
  add_biens(biens: any) {
      this.loading_add_biens = true;
      this.api.taf_post("biens/add", biens, (reponse: any) => {
      this.loading_add_biens = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table biens. Réponse= ", reponse);
          this.onReset_add_biens()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table biens a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_biens = false;
    })
  }
  
  get_details_add_biens_form() {
      this.loading_get_details_add_biens_form = true;
      this.api.taf_post("biens/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table biens. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table biens a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_biens_form = false;
      }, (error: any) => {
      this.loading_get_details_add_biens_form = false;
    })
  }
}
