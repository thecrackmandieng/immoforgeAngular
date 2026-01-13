import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FavorisTafType } from '../taf-type/favoris-taf-type';
@Component({
  selector: 'app-edit-favoris',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-favoris.component.html',
  styleUrls: ['./edit-favoris.component.css']
})
export class EditFavorisComponent implements OnInit, OnDestroy {
  reactiveForm_edit_favoris !: FormGroup;
  submitted: boolean = false
  loading_edit_favoris: boolean = false
  @Input()
  favoris_to_edit: FavorisTafType = new FavorisTafType();
  form_details: any = {}
  loading_get_details_edit_favoris_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) {

  }
  ngOnInit(): void {
      console.groupCollapsed("EditFavorisComponent");
      this.get_details_edit_favoris_form()
      this.update_form(this.favoris_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(favoris_to_edit:any) {
      this.reactiveForm_edit_favoris = this.formBuilder.group({
user_id : [favoris_to_edit.user_id],
bien_id : [favoris_to_edit.bien_id],
date_ajout : [favoris_to_edit.date_ajout]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_favoris .controls; }
  // validation du formulaire
  onSubmit_edit_favoris() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_favoris.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_favoris.invalid) {
          return;
      }
      var favoris = this.reactiveForm_edit_favoris.value
      this.edit_favoris({
      condition:{id_favori:this.favoris_to_edit.id_favori},
      data:favoris
      })
  }
  // vider le formulaire
  onReset_edit_favoris() {
      this.submitted = false;
      this.reactiveForm_edit_favoris.reset();
  }
  edit_favoris(favoris: any) {
      this.loading_edit_favoris = true;
      this.api.taf_post("favoris/edit", favoris, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table favoris. Réponse= ", reponse);
              //this.onReset_edit_favoris()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table favoris a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_favoris = false;
      }, (error: any) => {
          this.loading_edit_favoris = false;
      })
  }
  get_details_edit_favoris_form() {
      this.loading_get_details_edit_favoris_form = true;
      this.api.taf_post("favoris/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table favoris. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table favoris a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_favoris_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_favoris_form = false;
    })
  }
}
