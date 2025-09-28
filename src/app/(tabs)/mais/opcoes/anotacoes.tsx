
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, Stack } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import RenderHTML from 'react-native-render-html';
import { useTheme } from '../../../../ThemeContext';

interface Note {
  id: string;
  text: string;
}

export default function AnotacoesScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { width } = useWindowDimensions();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
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
    if (!html || html.trim() === '' || html.trim() === '<p><br></p>') {
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
      <Stack.Screen options={{ title: isWriting ? (editingNoteId ? 'Editar Anotação' : 'Nova Anotação') : 'Anotações' }} />
      {isWriting ? (
        <>
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
            ]}
            style={styles.richToolbar}
            iconTint={colors.text}
            selectedIconTint={colors.primary}
          />
          <ScrollView style={styles.editorContainer}>
            <RichEditor
              ref={richText}
              style={styles.richEditor}
              placeholder={"Comece a escrever aqui..."}
              initialContentHTML={editingNoteId ? notes.find(n => n.id === editingNoteId)?.text : ''}
              editorStyle={{
                backgroundColor: colors.card,
                color: colors.text,
                placeholderColor: colors.text,
              }}
            />
          </ScrollView>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <SwipeListView
            data={notes}
            renderItem={(data, rowMap) => (
              <TouchableOpacity onPress={() => handleStartEditing(data.item)} activeOpacity={0.7}>
                <View style={styles.notaBox}>
                  <RenderHTML
                    contentWidth={width}
                    source={{ html: data.item.text }}
                    baseStyle={{ fontFamily: 'SF-Pro-Display-Regular', fontSize: 16, lineHeight: 16 * 1.5, color: colors.text }}
                  />
                </View>
              </TouchableOpacity>
            )}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma anotação ainda.</Text>}
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

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: colors.primary,
    left: 0,
  },
  backRightBtn: {
    backgroundColor: colors.danger,
    right: 0,
  },
  backTextWhite: {
    fontFamily: 'SF-Pro-Display-Bold',
    color: colors.background,
  },
  richToolbar: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  editorContainer: {
    flex: 1,
  },
  richEditor: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'SF-Pro-Display-Bold',
    color: colors.background,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  notaBox: {
    backgroundColor: colors.card,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
    lineHeight: 16 * 1.5,
    color: colors.text,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 24,
    color: colors.background,
  },
});
