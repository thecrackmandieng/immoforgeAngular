import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ZonesTafType } from '../taf-type/zones-taf-type';
@Component({
  selector: 'app-edit-zones',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-zones.component.html',
  styleUrls: ['./edit-zones.component.css']
})
export class EditZonesComponent implements OnInit, OnDestroy {
  reactiveForm_edit_zones !: FormGroup;
  submitted: boolean = false
  loading_edit_zones: boolean = false
  @Input()
  zones_to_edit: ZonesTafType = new ZonesTafType();
  form_details: any = {}
  loading_get_details_edit_zones_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditZonesComponent");
      this.get_details_edit_zones_form()
      this.update_form(this.zones_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(zones_to_edit:any) {
      this.reactiveForm_edit_zones = this.formBuilder.group({
          region_id : [zones_to_edit.region_id],
code_zone : [zones_to_edit.code_zone],
libelle : [zones_to_edit.libelle],
latitude : [zones_to_edit.latitude],
longitude : [zones_to_edit.longitude]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_zones .controls; }
  // validation du formulaire
  onSubmit_edit_zones() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_zones.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_zones.invalid) {
          return;
      }
      var zones = this.reactiveForm_edit_zones.value
      this.edit_zones({
      condition:{id_zone:this.zones_to_edit.id_zone},
      data:zones
      })
  }
  // vider le formulaire
  onReset_edit_zones() {
      this.submitted = false;
      this.reactiveForm_edit_zones.reset();
  }
  edit_zones(zones: any) {
      this.loading_edit_zones = true;
      this.api.taf_post("zones/edit", zones, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table zones. Réponse= ", reponse);
              //this.onReset_edit_zones()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table zones a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_zones = false;
      }, (error: any) => {
          this.loading_edit_zones = false;
      })
  }
  get_details_edit_zones_form() {
      this.loading_get_details_edit_zones_form = true;
      this.api.taf_post("zones/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table zones. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table zones a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_zones_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_zones_form = false;
    })
  }
}