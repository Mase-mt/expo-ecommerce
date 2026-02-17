import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import SafeScreen from "./SafeScreen";
import { Ionicons } from "@expo/vector-icons";

interface AddressFormData {
  label: string;
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  isDefault: boolean;
}

interface AddressFormModalProps {
  visible: boolean;
  isEditing: boolean;
  addressForm: AddressFormData;
  isAddingAddress: boolean;
  isUpdatingAddress: boolean;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (form: AddressFormData) => void;
}
const AddressFormModal = ({
  addressForm,
  isAddingAddress,
  isEditing,
  isUpdatingAddress,
  onClose,
  onFormChange,
  onSave,
  visible,
}: AddressFormModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeScreen>
          <View className="px-6 py-5 border-b border-surface flex-row items-center justify-between">
            <Text className="text-text-primary text-2xl font-bold">
              {isEditing ? "Edit Address" : "Add Address"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <View className="p-6">
              {/* LABEL INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Label
                </Text>
                <TextInput
                  className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                  placeholder="eg. Home, Work, Car"
                  placeholderTextColor={"#666"}
                  value={addressForm.label}
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, label: text })
                  }
                />
              </View>

              {/* NAME INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Full Name
                </Text>
                <TextInput
                  className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                  placeholder="Enter your full name"
                  placeholderTextColor={"#666"}
                  value={addressForm.fullName}
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, fullName: text })
                  }
                />
              </View>
              {/* ADDRESS */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Address
                </Text>
                <TextInput
                  className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                  placeholder="Street Address, apt/suit number"
                  placeholderTextColor={"#666"}
                  value={addressForm.streetAddress}
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, streetAddress: text })
                  }
                  multiline
                />
              </View>

              {/* CITY INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  City
                </Text>
                <TextInput
                  className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                  placeholder="eg. NewYork"
                  placeholderTextColor={"#666"}
                  value={addressForm.city}
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, city: text })
                  }
                />
              </View>

              {/* STATE INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  State
                </Text>
                <TextInput
                  className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                  placeholder="eg. NY"
                  placeholderTextColor={"#666"}
                  value={addressForm.state}
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, state: text })
                  }
                />
              </View>

              {/* ZIP CODE INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Zip Code
                </Text>
                <TextInput
                  className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                  placeholder="eg. 1000"
                  placeholderTextColor={"#666"}
                  value={addressForm.zipCode}
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, zipCode: text })
                  }
                  keyboardType="numeric"
                />
              </View>

              {/* PHONE INPUT */}
              <View className="mb-5">
                <Text className="text-text-primary font-semibold mb-2">
                  Phone No.
                </Text>
                <TextInput
                  className="bg-surface text-text-primary p-4 rounded-2xl text-base"
                  placeholder="eg. 09XXXXXXXX"
                  placeholderTextColor={"#666"}
                  value={addressForm.phoneNumber}
                  onChangeText={(text) =>
                    onFormChange({ ...addressForm, phoneNumber: text })
                  }
                  keyboardType="phone-pad"
                />
              </View>

              {/* DEFAULT ADDRESS TOGGLE */}
              <View className="bg-surface rounded-2xl p-4 flex-row items-center justify-between mb-6">
                <Text className="text-text-primary font-semibold">
                  Set as default address
                </Text>
                <Switch
                  value={addressForm.isDefault}
                  onValueChange={(value) =>
                    onFormChange({ ...addressForm, isDefault: value })
                  }
                  thumbColor={"white"}
                  trackColor={{ false: "#2A2A2A", true: "#1DB954" }}
                />
              </View>

              {/* SAVE BUTTON */}

              <TouchableOpacity
                className="bg-primary rounded-2xl py-5 items-center"
                activeOpacity={0.8}
                onPress={onSave}
                disabled={isAddingAddress || isUpdatingAddress}
              >
                {isAddingAddress || isUpdatingAddress ? (
                  <ActivityIndicator size="small" color="#121212" />
                ) : (
                  <Text className="text-background font-bold text-lg">
                    {isEditing ? "Save Changes" : "Add Address"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeScreen>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddressFormModal;
