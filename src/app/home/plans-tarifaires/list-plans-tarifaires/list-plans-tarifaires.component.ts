import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddPlansTarifairesComponent } from '../add-plans-tarifaires/add-plans-tarifaires.component';
  import { EditPlansTarifairesComponent } from '../edit-plans-tarifaires/edit-plans-tarifaires.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { NgSelectModule } from '@ng-select/ng-select';
import { PlansTarifairesTafType } from '../taf-type/plans-tarifaires-taf-type';
  import { FormsModule } from '@angular/forms';
  @Component({
    selector: 'app-list-plans-tarifaires',
    standalone: true, // Composant autonome
    imports: [FormsModule,NgSelectModule], // Dépendances importées
    templateUrl: './list-plans-tarifaires.component.html',
    styleUrls: ['./list-plans-tarifaires.component.css']
  })
  export class ListPlansTarifairesComponent implements OnInit, OnDestroy{
    loading_get_plans_tarifaires = false
    loading_delete_plans_tarifaires = false
    les_plans_tarifairess: PlansTarifairesTafType[] = []
    list: PlansTarifairesTafType[] = []
    filter: any = {
      text: [],
    };
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      console.groupCollapsed("ListPlansTarifairesComponent");
      this.get_plans_tarifaires()
    }
    ngOnDestroy(): void {
      console.groupEnd();
    }
    get_plans_tarifaires() {
      this.loading_get_plans_tarifaires = true;
      this.api.taf_post("plans_tarifaires/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_plans_tarifairess = reponse.data
          console.log("Opération effectuée avec succés sur la table plans_tarifaires. Réponse= ", reponse);
          this.filter_change();
        } else {
          console.log("L'opération sur la table plans_tarifaires a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_plans_tarifaires = false;
      }, (error: any) => {
        this.loading_get_plans_tarifaires = false;
      })
    }
    filter_change(event?: any) {
      this.list = this.les_plans_tarifairess.filter((one: any) => {
        let search = !event?.term || JSON.stringify(one).toLowerCase().replace(/s/g, '')
          .includes(event?.term?.toLowerCase().replace(/s/g, ''))
        // filtre complexe
        // let filtre_objet: any = {}
        // let text = !this.filter.text || this.filter.text.length == 0
        //   || this.filter.text.filter((one_filtre: string) => {
        //     let domaine = !one_filtre.startsWith('domaine_') || (one_filtre.startsWith('domaine_') && one_filtre.replace('domaine_', '') == one.id_domaine)
        //     let zone = !one_filtre.startsWith('zone_') || (one_filtre.startsWith('zone_') && one_filtre.replace('zone_', '') == one.id_zone)

        //     // Incrémenter les compteurs
        //     if (one_filtre.startsWith('domaine_')) filtre_objet.domaine_ = (filtre_objet.domaine_ || 0) + 1
        //     if (one_filtre.startsWith('zone_')) filtre_objet.zone_ = (filtre_objet.zone_ || 0) + 1
        //     return domaine && zone
        //   }).length >= Object.keys(filtre_objet).length

        return search// && text
      })
    }
    delete_plans_tarifaires (plans_tarifaires : any){
      this.loading_delete_plans_tarifaires = true;
      this.api.taf_post("plans_tarifaires/delete", plans_tarifaires,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table plans_tarifaires . Réponse = ",reponse)
          this.get_plans_tarifaires()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table plans_tarifaires  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_plans_tarifaires = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_plans_tarifaires = false;
      })
    }
    openModal_add_plans_tarifaires() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddPlansTarifairesComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_plans_tarifaires()
        } else {

        }
      })
    }
    openModal_edit_plans_tarifaires(one_plans_tarifaires: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditPlansTarifairesComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.plans_tarifaires_to_edit = one_plans_tarifaires;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_plans_tarifaires()
        } else {

        }
      })
    }
  }