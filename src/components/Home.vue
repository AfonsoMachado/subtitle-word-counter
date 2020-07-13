<style scoped>

</style><template>
  <v-container fluid>
      <v-form>
          <!-- para anexar arquivo -->
          <v-file-input 
            label="Selecione as Legendas"
            prepend-icon="mdi-message-text"
            append-outer-icon="mdi-send"
            outlined
            multiple 
            chip 
            v-model="files"
            @click:append-outer="processSubtitles" />
      </v-form>
      <div class="pills">
          <Pill v-for="word in groupedWords" :key="word.name" :name="word.name" :amount="word.amount" />
      </div>
  </v-container>
</template>

<script>
import { ipcRenderer } from 'electron'
import Pill from './Pill'

export default {
    // declarando o componente pill para habilitar o seu uso
    components: { Pill },
    data: function() {
        return {
            files: [],
            groupedWords: []
        }   
    },
    methods: {
        processSubtitles() {
            //console.log(this.files)
            const paths = this.files.map(f => f.path)

            // Enviando parametro para o backend
            ipcRenderer.send('process-subtitles', paths)
            // Pegando e resposta
            ipcRenderer.on('process-subtitles', (event, resp) => {
                this.groupedWords = resp
                // console.log(this.groupedWords)
            })
        }
    }
}
</script>

<style>

    .pills {
        /* Definindo o layout como flexbox */
        display: flex;
        /* Permitindo quebra de linha  */
        flex-wrap: wrap;
        justify-content: flex-start;
    }

</style>