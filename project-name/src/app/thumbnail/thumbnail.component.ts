import { Component, Input, ElementRef, OnInit } from '@angular/core';
declare var Cropper: any;

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  @Input() title: string = "Medium-density Housing and Transport";
  @Input() subtitle: string = "My 2022 Honours project, investigating the link between different ways Canberra could develop, and their impact on the usage of sustainable transport modes (walking, cycling and public transport)";
  @Input() image_path: string = "assets/thumbnail-images/honours_thumbnail_700_350.png";
  @Input() page_path: string = "/honours"
}
  // attempt at cropping an image to a particular size, will instead just manually ensure images are the same size
  // HTML in image [ngClass]="[make_shorthand_title(this.title)] + '-title'"

  // private cropper: any;

  // ngOnInit(){
  //   this.initCropper();
  // }

  // initCropper() {
  //   var captionElements = document.getElementsByClassName(this.title + '-title');
  //   const imageElement = captionElements[0]

  //   this.cropper = new Cropper(imageElement, {
  //     aspectRatio: 1,
  //     viewMode: 2,
  //   });

  //   this.cropImage()
  // }

  // make_shorthand_title(title:string){
  //   return title.replace(/ /g, "_");
  // }

  // cropImage() {
  //   const croppedCanvas = this.cropper.getCroppedCanvas();
  //   const croppedDataUrl = croppedCanvas.toDataURL();
  //   console.log(croppedDataUrl);
  // }

