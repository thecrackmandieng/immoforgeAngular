import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EtatsBienTafType } from '../taf-type/etats-bien-taf-type';
@Component({
  selector: 'app-edit-etats-bien',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-etats-bien.component.html',
  styleUrls: ['./edit-etats-bien.component.css']
})
export class EditEtatsBienComponent implements OnInit, OnDestroy {
  reactiveForm_edit_etats_bien !: FormGroup;
  submitted: boolean = false
  loading_edit_etats_bien: boolean = false
  @Input()
  etats_bien_to_edit: EtatsBienTafType = new EtatsBienTafType();
  form_details: any = {}
  loading_get_details_edit_etats_bien_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditEtatsBienComponent");
      this.get_details_edit_etats_bien_form()
      this.update_form(this.etats_bien_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(etats_bien_to_edit:any) {
      this.reactiveForm_edit_etats_bien = this.formBuilder.group({
          code : [etats_bien_to_edit.code],
libelle : [etats_bien_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_etats_bien .controls; }
  // validation du formulaire
  onSubmit_edit_etats_bien() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_etats_bien.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_etats_bien.invalid) {
          return;
      }
      var etats_bien = this.reactiveForm_edit_etats_bien.value
      this.edit_etats_bien({
      condition:{id_etat_bien:this.etats_bien_to_edit.id_etat_bien},
      data:etats_bien
      })
  }
  // vider le formulaire
  onReset_edit_etats_bien() {
      this.submitted = false;
      this.reactiveForm_edit_etats_bien.reset();
  }
  edit_etats_bien(etats_bien: any) {
      this.loading_edit_etats_bien = true;
      this.api.taf_post("etats_bien/edit", etats_bien, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table etats_bien. Réponse= ", reponse);
              //this.onReset_edit_etats_bien()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table etats_bien a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_etats_bien = false;
      }, (error: any) => {
          this.loading_edit_etats_bien = false;
      })
  }
  get_details_edit_etats_bien_form() {
      this.loading_get_details_edit_etats_bien_form = true;
      this.api.taf_post("etats_bien/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table etats_bien. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table etats_bien a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_etats_bien_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_etats_bien_form = false;
    })
  }
}