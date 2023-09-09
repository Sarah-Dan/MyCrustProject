import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

const TaskManager = () => {
  const { user } = useUser();
  // go back to login screen
  const navigation = useNavigation();
  const goBackToLoginScreen = () => {
    navigation.goBack();
  };

  // add a new task
  const addNewTask = () => {
    if (newTaskTitle && newTaskDescription) {
      const taskId = Math.random().toString(36).substring(7);
      // Create the new task
      const newTask = {
        id: taskId,
        title: newTaskTitle,
        description: newTaskDescription,
      };
      // Add the new task to the tasks array
      setTasks([...tasks, newTask]);

      toggleModal();
    }
  };

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Budget",
      description: "Set monthly budget",
    },
    {
      id: "2",
      title: "Shopping",
      description: "Create a shopping list",
    },
    {
      id: "3",
      title: "POS",
      description: "Collect all POS receipts",
    },
  ]);

  const taskCount = tasks.length;

  // Modal state
  const [isModalVisible, setModalVisible] = useState(false);

  // Task input fields
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // mark a task as complete
  const markTaskAsCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  // delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back button */}
        <Text style={styles.backButton} onPress={goBackToLoginScreen}>
          &#8592;
        </Text>
        <Text style={styles.title}>Hello👋 {user && user.username}</Text>
        {/* Back button */}
      </View>

      {/* Task count section */}
      <View style={styles.taskCount}>
        <Text style={styles.taskCountText}>
          You have {taskCount} tasks today!
        </Text>
      </View>

      {/* Add New Task button */}
      <View style={styles.addTasks}>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.addTasksButton}>➕ Add Tasks</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.taskItem,
                item.completed ? styles.completedTask : null,
              ]}
            >
              <View style={styles.taskTextContainer}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed ? styles.completedTaskTitle : null,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.taskDescription,
                    item.completed ? styles.completedTaskDescription : null,
                  ]}
                >
                  {item.description}
                </Text>
                <View style={styles.buttonsContainer}>
                  {!item.completed && (
                    <TouchableOpacity
                      style={[styles.button, styles.completeButton]}
                      onPress={() => markTaskAsCompleted(item.id)}
                    >
                      <Text style={styles.buttonText}>✅ Done</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteTask(item.id)}
                  >
                    <Text style={styles.buttonText}>❌ Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
      {/*Add a task Modal */}
      <Modal isVisible={isModalVisible}>
        <KeyboardAvoidingView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a new task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            placeholderTextColor="silver"
            onChangeText={(text) => setNewTaskTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            placeholderTextColor="silver"
            onChangeText={(text) => setNewTaskDescription(text)}
          />
          <Button title="Add Task" onPress={addNewTask} />
          <Button title="Cancel" onPress={toggleModal} />
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default TaskManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "column",

    alignItems: "flex-start",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 32,
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 900,
    color: "#702F02",
  },
  addTasks: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fffaf6",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 16,
    textAlign: "center",
  },
  addTasksButton: {
    color: "#702F02",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  taskItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskTextContainer: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    marginTop: 5,
    color: "gray",
  },

  taskCount: {
    backgroundColor: "#702F02",
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
  },
  taskCountText: {
    color: "white",
    paddingVertical: 10,
    fontSize: 20,
  },
  completedTask: {
    backgroundColor: "#e0cbc8",
  },
  completedTaskTitle: {
    textDecorationLine: "line-through",
  },
  completedTaskDescription: {
    color: "brown",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button: {
    padding: 10,
    marginVertical: 10,
    marginEnd: 5,
    borderRadius: 100,
  },
  buttonText: {
    fontWeight: "bold",
  },
  completeButton: {
    fontColor: "green",
    backgroundColor: "white",
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: "white",
    borderWidth: 1,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
});
