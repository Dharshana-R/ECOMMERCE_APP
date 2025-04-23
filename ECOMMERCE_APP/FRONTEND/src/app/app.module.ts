import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HomeComponent } from './component/home/home.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
//import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CartComponent } from './component/cart/cart.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CheckoutComponent } from './component/checkout/checkout.component';

import { MatInputModule } from '@angular/material/input';




//import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    HttpClientModule,
    MatTabsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent }, 
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}