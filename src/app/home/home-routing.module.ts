import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBienDocumentsComponent } from './bien-documents/list-bien-documents/list-bien-documents.component';
import { ListBienImagesComponent } from './bien-images/list-bien-images/list-bien-images.component';
import { ListBienOptionComponent } from './bien-option/list-bien-option/list-bien-option.component';
import { ListBienTarifsComponent } from './bien-tarifs/list-bien-tarifs/list-bien-tarifs.component';
import { ListBiensComponent } from './biens/list-biens/list-biens.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { ListDemandesComponent } from './demandes/list-demandes/list-demandes.component';
import { ListEtatsBienComponent } from './etats-bien/list-etats-bien/list-etats-bien.component';
import { ListEtatsDemandeComponent } from './etats-demande/list-etats-demande/list-etats-demande.component';
import { ListFavorisComponent } from './favoris/list-favoris/list-favoris.component';
import { ListModesPaiementComponent } from './modes-paiement/list-modes-paiement/list-modes-paiement.component';
import { ListOptionsCatalogueComponent } from './options-catalogue/list-options-catalogue/list-options-catalogue.component';
import { ListPermissionsComponent } from './permissions/list-permissions/list-permissions.component';
import { ListPlansTarifairesComponent } from './plans-tarifaires/list-plans-tarifaires/list-plans-tarifaires.component';
import { ListProprietairesComponent } from './proprietaires/list-proprietaires/list-proprietaires.component';
import { ListRegionsComponent } from './regions/list-regions/list-regions.component';
import { ListReglesCommissionComponent } from './regles-commission/list-regles-commission/list-regles-commission.component';
import { ListRolePermissionComponent } from './role-permission/list-role-permission/list-role-permission.component';
import { ListRolesComponent } from './roles/list-roles/list-roles.component';
import { ListStatutUserComponent } from './statut-user/list-statut-user/list-statut-user.component';
import { ListStatutValidationBienComponent } from './statut-validation-bien/list-statut-validation-bien/list-statut-validation-bien.component';
import { ListTypesBienComponent } from './types-bien/list-types-bien/list-types-bien.component';
import { ListTypesTarifComponent } from './types-tarif/list-types-tarif/list-types-tarif.component';
import { ListUserDocumentsComponent } from './user-documents/list-user-documents/list-user-documents.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ListZonesComponent } from './zones/list-zones/list-zones.component';

const routes: Routes = [
  {path:"",component:ListBienDocumentsComponent},
{path:"bien_documents",component:ListBienDocumentsComponent},
{path:"bien_images",component:ListBienImagesComponent},
{path:"bien_option",component:ListBienOptionComponent},
{path:"bien_tarifs",component:ListBienTarifsComponent},
{path:"biens",component:ListBiensComponent},
{path:"clients",component:ListClientsComponent},
{path:"demandes",component:ListDemandesComponent},
{path:"etats_bien",component:ListEtatsBienComponent},
{path:"etats_demande",component:ListEtatsDemandeComponent},
{path:"favoris",component:ListFavorisComponent},
{path:"modes_paiement",component:ListModesPaiementComponent},
{path:"options_catalogue",component:ListOptionsCatalogueComponent},
{path:"permissions",component:ListPermissionsComponent},
{path:"plans_tarifaires",component:ListPlansTarifairesComponent},
{path:"proprietaires",component:ListProprietairesComponent},
{path:"regions",component:ListRegionsComponent},
{path:"regles_commission",component:ListReglesCommissionComponent},
{path:"role_permission",component:ListRolePermissionComponent},
{path:"roles",component:ListRolesComponent},
{path:"statut_user",component:ListStatutUserComponent},
{path:"statut_validation_bien",component:ListStatutValidationBienComponent},
{path:"types_bien",component:ListTypesBienComponent},
{path:"types_tarif",component:ListTypesTarifComponent},
{path:"user_documents",component:ListUserDocumentsComponent},
{path:"users",component:ListUsersComponent},
{path:"zones",component:ListZonesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }