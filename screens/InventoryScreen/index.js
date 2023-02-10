import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../../data";
import Card from "../../components/Card";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";

const Index = () => {
  const [cat, setCat] = useState();
  const [image, setImage] = useState(null);
  const [list, setList] = useState(data);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      amount: "",
      description: "",
    },
  });

  const renderItem = ({ item }) => <Card item={item} />;
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const options = {
    title: "Select Image",
    type: "library",
    options: {
      maxHeight: 200,
      maxWidth: 200,
      mediaType: "photo",
      includeBase64: false,
    },
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data) => {
    let obj = {
      id: uuid.v4(),
      name: data.name,
      purchasePrice: data.amount,
      type: data.category,
      photo: image,
    };
    setList([...list, obj]);
    handleClosePress();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <View style={styles.header}>
        <View>
          <Text style={styles.text}>Inventory</Text>
        </View>

        <TouchableOpacity onPress={handlePresentModalPress}>
          <Ionicons name="add-circle" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        style={{ marginTop: 10 }}
      />

      {/* BottomSheet */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          enabledGestureInteraction={true}
          snapPoints={snapPoints}
        >
          <View style={styles.contentContainer}>
            <View style={styles.bottomSheetButtons}>
              <TouchableOpacity onPress={handleClosePress}>
                <Text
                  style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text
                  style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>

            {/* Add New Item */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {image !== null ? (
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{ uri: image }}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 150,
                        height: 150,
                        borderRadius: 150 / 2,
                        borderWidth: 2,
                        borderColor: "#e5e5e5",
                        marginVertical: 20,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => setImage(null)}
                      style={{ position: "absolute", bottom: 20, right: 10 }}
                    >
                      <AntDesign name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 150,
                      height: 150,
                      borderRadius: 150 / 2,
                      borderWidth: 2,
                      borderColor: "#e5e5e5",
                      marginVertical: 20,
                    }}
                    onPress={takePicture}
                  >
                    <Ionicons name="camera" size={30} color="blue" />
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      Add Photo
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Name */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      Name{" "}
                    </Text>
                    <View>
                      <TextInput
                        style={{
                          borderColor: errors.name ? "red" : "#e5e5e5",
                          borderRadius: 10,
                          borderWidth: 2,
                          backgroundColor: "#fff",
                          fontSize: 14,
                          marginVertical: 10,
                          paddingHorizontal: 20,
                          color: "#666666",
                          height: 40,
                          lineHeight: 0,
                        }}
                        placeholder="Enter Title"
                        placeholderTextColor={"#C4C4C4"}
                        // onChangeText={onChange}
                        onChangeText={(text) => {
                          onChange(text);
                        }}
                        // value={value}
                        onBlur={onBlur}
                      />
                    </View>
                  </View>
                )}
                name="name"
              />
              {errors.name && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  Name is required.
                </Text>
              )}

              {/* Select Category */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      Select Category{" "}
                    </Text>
                    <View
                      style={{
                        borderColor: errors.category ? "red" : "#e5e5e5",
                        borderRadius: 10,
                        borderWidth: 2,
                        backgroundColor: "#fff",
                        marginVertical: 10,
                        paddingHorizontal: 20,
                        width: "100%",
                        height: 40,
                        lineHeight: 0,
                        justifyContent: "center",
                      }}
                    >
                      <Picker
                        selectedValue={cat}
                        // mode="dropdown"
                        style={{
                          fontSize: 14,
                          color: "#666666",
                          textAlign: "left",
                        }}
                        onValueChange={
                          (itemValue, itemIndex) => {
                            setCat(itemValue);
                            onChange(itemValue);
                          }
                          // onChange(itemValue)
                        }
                        // onValueChange={onChange}
                      >
                        <Picker.Item key={""} label="Select Category" />
                        <Picker.Item label="Art" value="Art" />
                        <Picker.Item label="Electronics" value="Electronics" />
                        <Picker.Item label="Jewelry" value="Jewelry" />
                        <Picker.Item
                          label="Musical Instrument"
                          value="Musical Instrument"
                        />
                      </Picker>
                    </View>
                  </View>
                )}
                name="category"
              />
              {errors.category && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  Category is required.
                </Text>
              )}

              {/* Amount */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      Amount{" "}
                    </Text>
                    <View>
                      <TextInput
                        style={{
                          borderColor: errors.amount ? "red" : "#e5e5e5",
                          borderRadius: 10,
                          borderWidth: 2,
                          backgroundColor: "#fff",
                          fontSize: 14,
                          marginVertical: 10,
                          paddingHorizontal: 20,
                          color: "#666666",
                          height: 40,
                          lineHeight: 0,
                        }}
                        placeholder="Enter Value"
                        placeholderTextColor={"#C4C4C4"}
                        // onChangeText={onChange}
                        onChangeText={(text) => {
                          onChange(text);
                        }}
                        // value={value}
                        onBlur={onBlur}
                      />
                    </View>
                  </View>
                )}
                name="amount"
              />
              {errors.amount && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  Amount is required.
                </Text>
              )}

              {/* Description */}
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      Description{" "}
                    </Text>
                    <View>
                      <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={{
                          borderColor: "#e5e5e5",
                          borderRadius: 10,
                          borderWidth: 2,
                          backgroundColor: "#fff",
                          fontSize: 14,
                          marginVertical: 10,
                          paddingHorizontal: 20,
                          color: "#666666",
                          height: 200,
                          lineHeight: 0,
                          textAlignVertical: "top",
                        }}
                        placeholder="Optional"
                        placeholderTextColor={"#C4C4C4"}
                        // onChangeText={onChange}
                        onChangeText={(text) => {
                          onChange(text);
                        }}
                        // value={value}
                        onBlur={onBlur}
                      />
                    </View>
                  </View>
                )}
                name="description"
              />
            </ScrollView>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 15,
    paddingTop: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 30,
    fontWeight: "800",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
