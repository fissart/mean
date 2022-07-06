import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { KatexModule } from 'ng-katex';
//import { MarkdownModule } from 'ngx-markdown';
import { NavigationComponent } from './components/cmpt2-navigation/navigation.component';
import { PhotosListComponent } from './components/cmpt1-land/photos-list.component';
import { PhotoPreviewComponent } from './components/cmpt7-curse-preview/curse-preview.component';
import { UserComponent } from './components/cmpt3-user-register/user.component';
import { LoginComponent } from './components/cmpt5-login/login.component';
import { LandComponent } from "./components/cmpt2-users/land.component";


import { UserPreviewComponent } from './components/cmpt4-user-preview/user-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsignatureComponent } from './components/cmpt6-curse/asignature.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { TasksComponent } from './components/cmpt11-tasks/tasks.component';
import { SwiperModule } from 'swiper/angular';
//import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
//import { YouTubePlayerModule } from "@angular/youtube-player";
import { NgxHeadroomModule } from 'ngx-headroom';
import {MatIconModule} from '@angular/material/icon';
import { UnityPreviewComponent } from './components/cmpt9-unity-preview/unity-preview.component';
import { ThemePreviewComponent } from './components/cmpt10-theme-preview/theme-preview.component';

import { NgxDocViewerModule } from "ngx-doc-viewer";
//import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TaskPreviewComponent } from './components/cmpt12-task-preview/task-preview.component';
import { UsersCurseComponent } from './components/cmpt8-integer/integer.component';
import { FileComponent } from './components/cmpt13-file/file.component';
//import { NgxMarkdownItModule } from "ngx-markdown-it";
//import { NgxMarkdownItConfig } from "ngx-markdown-it";
import { ExcelService } from './services/excel.service';
//import { default as markmapPlugin } from 'markdown-it-markmap';
@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		PhotosListComponent,
		LandComponent,
		LoginComponent,
		UserComponent,
		PhotoPreviewComponent,
		UserPreviewComponent,
		AsignatureComponent,
		TasksComponent,
  UnityPreviewComponent,
  ThemePreviewComponent,
  TaskPreviewComponent,
  UsersCurseComponent,
  FileComponent,
  	],
	imports: [
		BrowserModule,
		NgxDocViewerModule,
		FormsModule,
		AppRoutingModule,
		CommonModule,
		DragDropModule,
		NgbModule,
		KatexModule,
        SwiperModule,
        //NgxHideOnScrollModule,
		HttpClientModule,
        MatIconModule,
        //YouTubePlayerModule,
        NgxHeadroomModule,
		//MarkdownModule.forRoot(),
		//NgxMarkdownItModule.forRoot(
			//{
		 //plugins: [
		//	 markmapPlugin
		 //]
	 //}
 //),
		MatProgressBarModule,
		BrowserAnimationsModule,
        NgxExtendedPdfViewerModule
	],
	  providers: [ExcelService],
	bootstrap: [AppComponent],
})
export class AppModule { }
