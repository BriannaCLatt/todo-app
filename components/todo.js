import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TextInput, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';

const TodoScreen = () => {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Task 1', completed: false },
    { key: '2', description: 'Task 2', completed: false },
  ]);
  const [inputText, setInputText] = useState('');

  const toggleCompletion = (key) => {
    const newTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const addTask = () => {
    if (inputText.trim() === '') {
      return;
    }
    const newTask = {
      key: String(tasks.length + 1),
      description: inputText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleCompletion(item.key)}
        containerStyle={{ padding: 0, margin: 0, minWidth: 0 }}
      />
      <Text
        style={item.completed ? styles.taskTextCompleted : styles.taskText}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Add new task"
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    marginLeft: 10,
  },
  taskTextCompleted: {
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#937BA3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  addButtonText: {
    color: 'white',
  },
});


export default TodoScreen;
