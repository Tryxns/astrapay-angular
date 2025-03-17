import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'bootstrap';
import { NotesService } from './notes.service';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'astrapay-angular-2';
  constructor (private notesService: NotesService){};
  notes: any | null;
  newNote = { title: '', content: '' };
  errorMessage: string | undefined;
  
  onSubmit(event: any) {
    if (event.target[1].value) {
      this.newNote.title = event.target[0].value;
      this.newNote.content = event.target[1].value;
      this.notesService.createNote(this.newNote).subscribe(
        (response) => {
          console.log('Note created successfully:', response);
          this.newNote = { title: '', content: '' };

          $('#title, #content').val('');
          $('#closeCreateModal').click();
          
          this.loadNotes();
        },
        (error) => {
          console.error('Error creating note:', error);
        }
      );
    }
    else{
      alert("Note content can't be empty");
    }
  }
  deleteNote(sequence_id: number) {
    this.notesService.deleteNote(sequence_id).subscribe(
      (response) => {
        this.loadNotes();
      },
      (error) => {
        console.error('Error delete note:', error);
      }
    );    
  }
  viewNote(sequence_id: number){
    this.notesService.getnoteById(sequence_id).subscribe(
      (response) => {
        console.log('Note created successfully:', response);
        $('#noteViewModalHeader').text(response.title);
        $('#noteViewModalContent').text(response.content);
      },
      (error) => {
        console.error('Error delete note:', error);
      }
    );    
  }

  ngOnInit(){
    this.loadNotes();    
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe(
      (data) => {
        if(data.length > 0) this.notes = data;
        else {
          this.notes = null;
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching notes.';
      }
    );
  }
}
