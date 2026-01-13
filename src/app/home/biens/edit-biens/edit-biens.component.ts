import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BiensTafType } from '../taf-type/biens-taf-type';
@Component({
  selector: 'app-edit-biens',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-biens.component.html',
  styleUrls: ['./edit-biens.component.css']
})
export class EditBiensComponent implements OnInit, OnDestroy {
  reactiveForm_edit_biens !: FormGroup;
  submitted: boolean = false
  loading_edit_biens: boolean = false
  @Input()
  biens_to_edit: BiensTafType = new BiensTafType();
  form_details: any = {}
  loading_get_details_edit_biens_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditBiensComponent");
      this.get_details_edit_biens_form()
      this.update_form(this.biens_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(biens_to_edit:any) {
      this.reactiveForm_edit_biens = this.formBuilder.group({
          uuid : [biens_to_edit.uuid],
proprietaire_user_id : [biens_to_edit.proprietaire_user_id],
type_bien_id : [biens_to_edit.type_bien_id],
etat_bien_id : [biens_to_edit.etat_bien_id],
statut_validation_id : [biens_to_edit.statut_validation_id],
titre : [biens_to_edit.titre],
description : [biens_to_edit.description],
region_id : [biens_to_edit.region_id],
zone_id : [biens_to_edit.zone_id],
adresse_detaillee : [biens_to_edit.adresse_detaillee],
latitude : [biens_to_edit.latitude],
longitude : [biens_to_edit.longitude],
superficie : [biens_to_edit.superficie],
chambres : [biens_to_edit.chambres],
salles_bain : [biens_to_edit.salles_bain],
capacite : [biens_to_edit.capacite],
prix : [biens_to_edit.prix],
devise : [biens_to_edit.devise],
date_publication : [biens_to_edit.date_publication],
date_modification : [biens_to_edit.date_modification],
raison_refus : [biens_to_edit.raison_refus],
is_archived : [biens_to_edit.is_archived]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_biens .controls; }
  // validation du formulaire
  onSubmit_edit_biens() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_biens.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_biens.invalid) {
          return;
      }
      var biens = this.reactiveForm_edit_biens.value
      this.edit_biens({
      condition:{id_bien:this.biens_to_edit.id_bien},
      data:biens
      })
  }
  // vider le formulaire
  onReset_edit_biens() {
      this.submitted = false;
      this.reactiveForm_edit_biens.reset();
  }
  edit_biens(biens: any) {
      this.loading_edit_biens = true;
      this.api.taf_post("biens/edit", biens, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table biens. Réponse= ", reponse);
              //this.onReset_edit_biens()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table biens a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_biens = false;
      }, (error: any) => {
          this.loading_edit_biens = false;
      })
  }
  get_details_edit_biens_form() {
      this.loading_get_details_edit_biens_form = true;
      this.api.taf_post("biens/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table biens. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table biens a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_biens_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_biens_form = false;
    })
  }
}