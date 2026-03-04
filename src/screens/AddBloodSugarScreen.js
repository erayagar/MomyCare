import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useForm } from '../hooks/useForm';
import {
  validateBloodSugar,
  validateInsulinDose,
  validateRequired,
} from '../utils/validation';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const AddBloodSugarScreen = ({ navigation, route }) => {
  const { onSave } = route.params || {};

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
  } = useForm(
    {
      meal: '',
      fastingStatus: '',
      bloodSugarValue: '',
      insulinDose: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    },
    {
      meal: (value) => validateRequired(value, 'Öğün'),
      fastingStatus: (value) => validateRequired(value, 'Açlık durumu'),
      bloodSugarValue: (value) => {
        const required = validateRequired(value, 'Kan şekeri değeri');
        if (!required.valid) return required;
        return validateBloodSugar(value);
      },
      insulinDose: (value) => {
        if (!value || value.trim() === '') return { valid: true };
        return validateInsulinDose(value);
      },
    }
  );

  const handleSave = () => {
    if (!validate()) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun ve hataları düzeltin.');
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      meal: values.meal,
      fastingStatus: values.fastingStatus,
      date: values.date,
      time: values.time,
      bloodSugarValue: Number(values.bloodSugarValue),
      insulinDose: values.insulinDose ? Number(values.insulinDose) : '',
    };

    if (onSave) {
      onSave(newRecord);
    }

    Alert.alert('Başarılı', 'Kan şekeri kaydı başarıyla eklendi.', [
      {
        text: 'Tamam',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kan Şekeri Ekle</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FormInput
          label="Öğün *"
          value={values.meal}
          onChangeText={(text) => handleChange('meal', text)}
          onBlur={() => handleBlur('meal')}
          error={errors.meal}
          touched={touched.meal}
          placeholder="Sabah, Öğle, Akşam"
        />

        <FormInput
          label="Açlık Durumu *"
          value={values.fastingStatus}
          onChangeText={(text) => handleChange('fastingStatus', text)}
          onBlur={() => handleBlur('fastingStatus')}
          error={errors.fastingStatus}
          touched={touched.fastingStatus}
          placeholder="Açlık, Tokluk"
        />

        <FormInput
          label="Kan Şekeri Değeri (mg/dl) *"
          value={values.bloodSugarValue}
          onChangeText={(text) => handleChange('bloodSugarValue', text)}
          onBlur={() => handleBlur('bloodSugarValue')}
          error={errors.bloodSugarValue}
          touched={touched.bloodSugarValue}
          keyboardType="numeric"
          placeholder="Örn: 95"
        />

        <FormInput
          label="İnsülin Dozu (opsiyonel)"
          value={values.insulinDose}
          onChangeText={(text) => handleChange('insulinDose', text)}
          onBlur={() => handleBlur('insulinDose')}
          error={errors.insulinDose}
          touched={touched.insulinDose}
          keyboardType="numeric"
          placeholder="Örn: 10"
        />

        <FormInput
          label="Tarih *"
          value={values.date}
          onChangeText={(text) => handleChange('date', text)}
          onBlur={() => handleBlur('date')}
          error={errors.date}
          touched={touched.date}
          placeholder="YYYY-MM-DD"
        />

        <FormInput
          label="Saat *"
          value={values.time}
          onChangeText={(text) => handleChange('time', text)}
          onBlur={() => handleBlur('time')}
          error={errors.time}
          touched={touched.time}
          placeholder="HH:MM"
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Kaydet"
            onPress={handleSave}
            variant="primary"
            style={styles.saveButton}
          />
          <Button
            title="Temizle"
            onPress={reset}
            variant="secondary"
            style={styles.resetButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.primaryDark,
  },
  backIcon: {
    fontSize: 24,
    color: colors.textWhite,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textWhite,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  buttonContainer: {
    marginTop: 8,
  },
  saveButton: {
    marginBottom: 12,
  },
  resetButton: {
    // Secondary button styles
  },
});

export default AddBloodSugarScreen;
