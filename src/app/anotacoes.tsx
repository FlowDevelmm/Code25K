import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  useWindowDimensions,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import RenderHTML from 'react-native-render-html';

interface Note {
  id: string;
  text: string; // Agora o texto será HTML
}

export default function AnotacoesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Ref para o editor de rich text
  const richText = useRef<any>();

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      if (isWriting) {
        setIsWriting(false);
        setEditingNoteId(null);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isWriting]);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Failed to load notes.', error);
    }
  };

  const handleSaveNote = async () => {
    const html = await richText.current?.getContentHtml();
    if (!html || html.trim() === '<p><br></p>' || html.trim().length === 0) {
      Alert.alert('Atenção', 'Você não pode salvar uma anotação vazia.');
      return;
    }
    try {
      let newNotes: Note[];
      if (editingNoteId) {
        newNotes = notes.map(note =>
          note.id === editingNoteId ? { ...note, text: html } : note
        );
      } else {
        const newNote: Note = { id: Date.now().toString(), text: html };
        newNotes = [newNote, ...notes];
      }
      setNotes(newNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setIsWriting(false);
      setEditingNoteId(null);
    } catch (error) {
      console.error('Failed to save note.', error);
      Alert.alert('Erro', 'Não foi possível salvar a anotação.');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Failed to delete note.', error);
    }
  };

  const handleStartEditing = (note: Note) => {
    setIsWriting(true);
    setEditingNoteId(note.id);
    // O conteúdo será passado para o RichEditor via initialContentHTML
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <TouchableOpacity
            style={[styles.backBtn, styles.backLeftBtn]}
            onPress={() => handleStartEditing(data.item)}
        >
            <Text style={styles.backTextWhite}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.backBtn, styles.backRightBtn]}
            onPress={() => handleDeleteNote(data.item.id)}
        >
            <Text style={styles.backTextWhite}>Apagar</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isWriting ? (
        // --- MODO DE ESCRITA / EDIÇÃO ---
        <>
            <RichToolbar
                editor={richText.current}
                actions={[ 
                    actions.setBold, 
                    actions.setItalic, 
                    actions.setUnderline,
                    actions.setStrikethrough,
                    actions.insertH1, 
                    actions.insertH2, 
                    actions.insertH3,
                    actions.insertBulletsList, 
                    actions.insertOrderedList,
                 ]}
                style={styles.richToolbar}
            />
            <ScrollView style={styles.editorContainer}>
                <RichEditor
                    ref={richText}
                    style={styles.richEditor}
                    placeholder={"Comece a escrever aqui..."}
                    initialContentHTML={editingNoteId ? notes.find(n => n.id === editingNoteId)?.text : ''}
                    editorStyle={{
                        backgroundColor: '#f9f9f9',
                        placeholderColor: '#999'
                    }}
                />
            </ScrollView>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveNote}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </>
      ) : (
        // --- MODO DE LISTA ---
        <>
          <SwipeListView
            data={notes}
            renderItem={(data, rowMap) => (
                <TouchableOpacity onPress={() => handleStartEditing(data.item)} activeOpacity={0.7}>
                    <View style={styles.notaBox}>
                        <RenderHTML
                            contentWidth={width}
                            source={{ html: data.item.text }}
                        />
                    </View>
                </TouchableOpacity>
            )}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: 80 }}
            ListEmptyComponent={<Text style={styles.semNotas}>Nenhuma anotação ainda.</Text>}
          />

          <TouchableOpacity style={styles.fab} onPress={() => {
            setIsWriting(true);
            setEditingNoteId(null);
          }}>
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// --- ESTILOS ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // --- Estilos do Modo de Escrita ---
  editorContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderRadius: 8,
  },
  richToolbar: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  richEditor: {
    minHeight: 300,
    backgroundColor: 'white',
  },

  // --- Estilos do Modo de Lista ---
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  semNotas: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
    fontFamily: 'Inter-Regular',
  },
  notaBox: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    marginBottom: 15,
    borderRadius: 8,
  },
  backBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtn: {
    backgroundColor: '#00bfff',
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  backRightBtn: {
    backgroundColor: '#ff4d4d',
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  backTextWhite: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // --- Botões (Comuns e Específicos) ---
  button: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#00bfff',
    marginTop: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00bfff',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
  },
});
