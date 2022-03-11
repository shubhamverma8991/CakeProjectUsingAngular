import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  cakes: any;
  thereISerror: any = false;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe((query) => {
      // alert('Query is changed' + JSON.stringify(query));

      var url =
        'https://apifromashu.herokuapp.com/api/searchcakes?q=' + query['q'];
      this.http.get(url).subscribe(
        (response: any) => {
          console.log('... response from all cakes api', response);
          this.cakes = response.data;
          if (this.cakes.length == 0) {
            this.thereISerror = true;
          }
        },
        (error) => {
          console.log('Error from all cakes api', error);
        }
      );
    });
  }

  ngOnInit(): void {}
}
